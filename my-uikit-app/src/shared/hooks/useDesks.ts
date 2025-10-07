import {create} from "zustand/index";

export const useDesks= create((set)=>({
    desks:{},
    increasePopulation:()=>set((state:any)=>({bears:state.bears+1})),
    removeAllBears:()=> set({bears:0}),
    updateBears:(newBears:any)=>set({bears:newBears}),
}))