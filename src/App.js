import './App.css';
import {useRef, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { createCubes,findCube,findCrossRoad,finishGame,retryGame,botDoStep,changeGameMod } from './redux/cubeSlice';

function App() {

  const dispatch = useDispatch()

  const cubes = useSelector(state=>state.cubeSlice.cubes)
  const winX = useSelector(state=>state.cubeSlice.winX)
  const winO = useSelector(state=>state.cubeSlice.winO)
  const counter = useSelector(state=>state.cubeSlice.count)
  const playWithBot = useSelector(state=>state.cubeSlice.playWithBot)


  useEffect(()=>{
    dispatch(createCubes())
  },[cubes])

  function clickCube(row, column, text, id){

    dispatch(findCube({id, row, column,text}))
    dispatch(findCrossRoad())

    if (!text && playWithBot){

      setTimeout(() => {
        
        dispatch(botDoStep(true))

        setTimeout(() => {
          dispatch(findCrossRoad())
        }, 500)

        setTimeout(() => {
          dispatch(finishGame())
        }, 1000);

      }, 500)
    }

    setTimeout(() => {
      dispatch(finishGame())
    }, 700);

  }

  return (
    <div className="App">

      <div className='game-info'>

        <span className='text-container'>
          <h2>X: {winX } </h2>
          <h2>O: {winO } </h2>
         
        </span>
        

        
        <span className='btn-container'>
          <button onClick={()=>dispatch(retryGame())}>заново</button>
          <button onClick={()=>dispatch(finishGame(true))}>ничья</button>

          <label className='checkbox-btn '>
            
              <input type="checkbox" value={playWithBot}
                onChange={(e)=>dispatch(changeGameMod(e))}/>
                <span >бот</span>
          </label>
        
        </span>

        

        
        
      </div>

        
      <main>
        
        {cubes?cubes.map((e,i)=>{

          if (e.crossRoad){
            return(
              <div className='green' onClick={()=>clickCube(e.row,e.column,e.text,e.id)} key={i}>
                
                <h1>{e.text}</h1>
      
              </div>
              )
          }
            return(
              <div className='cube' onClick={()=>clickCube(e.row,e.column,e.text,e.id)} key={i}>
                
                <h1>{e.text}</h1>
      
              </div>
              )
            }
        ): null}
      </main>
    </div>
  );
}

export default App;
