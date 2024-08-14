import { CartItem } from "@/types/types";
import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";



interface CartState {
    items: CartItem[];
    status:'idle'|'loading'|'succeeded'|'failed';
    error:string|null|undefined;
}

export const fetchProducts = createAsyncThunk<CartItem[]>('cart/fetchProducts', async () => {
    const response = await fetch('/api/products')
    const data = await response.json()
    return data
})

const initialState:CartState = {
    items:[],
    status:'idle',
    error:null
}



const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem: (state, action:PayloadAction<CartItem>) => {
            const item = state.items.find(item => item.id === action.payload.id)
            if(item){
                item.quantity += 1
            }
            else{
                state.items.push({...action.payload,quantity:1})
            }
        },
        removeItem:(state, action:PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        increaseQuantity:(state, action:PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload)
            if(item){
                item.quantity += 1
            }
        },
        decreaseQuantity:(state, action:PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload)
            if(item && item.quantity > 1){
                item.quantity -= 1
            }
        },
        resetCart:(state) => {
            state.items = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchProducts.fulfilled, (state, action:PayloadAction<CartItem[]>) => {
            state.status ='succeeded'
            state.items = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status ='failed';
            state.error = action.error.message
        })
    }

})

export const {addItem,resetCart, removeItem, increaseQuantity,decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;