import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';

export const getFeaturedProducts = createAsyncThunk(
    'products/getFeaturedProducts',
    async () => {

        const response = await fetch('http://localhost:5001/jazmiro/us-central1/api/square/products',{
        method:'GET',
        headers:{
            //Access-Control-Allow-Origin
            'Access-Control-Allow-Origin':'*',
            'Square-Version': '2022-01-20',
            'Authorization':'Bearer EAAAENt1YVTeAE8xwkjyU3afL9UZmdNR_F479-m-FxZvJsctRqGQ4NyrGYc4XfGx',
            'Content-Type':'application/json'
        }   
        })
        const data = await response.json()
        
        let  results = await Promise.all(data.objects.map(async (item) => {
                
            if (item.item_data.image_ids!= undefined)
            return  fetch('http://localhost:5001/jazmiro/us-central1/api/square/products/image',{
                method:'POST',
                headers:{
                    //Access-Control-Allow-Origin
                    'Access-Control-Allow-Origin':'*',
                    'Square-Version': '2022-01-20',
                    'Authorization':'Bearer EAAAENt1YVTeAE8xwkjyU3afL9UZmdNR_F479-m-FxZvJsctRqGQ4NyrGYc4XfGx',
                    'Content-Type':'application/json'
                } ,
                body:JSON.stringify({
                    image_id:item.item_data.image_ids[0]  
                })
                
            }).then(response => response.json())
            .then(imageObject => {
                item.image=imageObject.objects[0]
                return item
            })
        
        }));
        return results
        
    }
  )
export const productsSlice = createSlice({
    name: "products",
    initialState: {
        mostProducts:[],
        featuredProducts: [],
        current:[],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        //if action.payload is undefined, filter out undefined values
        let  featuredProductsSERVER = action.payload.filter(item => item != undefined)
        state.featuredProducts = featuredProductsSERVER;
        state.mostProducts = featuredProductsSERVER;
        return state
      })
        builder.addCase(getFeaturedProducts.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
            builder.addCase(getFeaturedProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
        }
});
export default productsSlice.reducer;