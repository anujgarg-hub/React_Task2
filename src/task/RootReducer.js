const initialState={
    todo:{}
}

 

    export default function RootReducer(state=initialState , action){

    switch(action.type)
    {
        case 'Add_task' :
          state.todo[action.payload[0]] = action.payload[1]
          console.log("todo Is Hear:- ",state.todo)
          return {todo:state.todo} 
        
          case 'Remove_task':
              delete state.todo[action.payload[0]]
              console.log("todo Is deleted:- ",state.todo)

              return {todo :state.todo}         ////   No need to use breake; after return ///

              case 'Edit_task':
              state.todo[action.payload[0]] = action.payload[1]
              console.log("todo Is Editted:- ",state.todo)
              return {todo:state.todo} 

         default:
             return state
    }
}
