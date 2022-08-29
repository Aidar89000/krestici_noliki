import { createSlice } from '@reduxjs/toolkit'

const cubeSlice= createSlice({
    name: 'cubeSlice',

    initialState:{
        cubes: [],
        count: 0,
        winX: 0,
        winO: 0,
        finish: false,
        playWithBot: false
    },

    reducers:{
        createCubes(state,action){
    
            let column = -1
            let row = 0
            
            for (let i=0; i<9; i++){
                column++
                  
                if (column>=3){
                    column=0
                    row++
                }

                if (state.cubes.length<9)
                    state.cubes.push({text: null, id: Math.floor(Math.random()*10**3), row: row, column: column, crossRoad: false})
            }
    },

        findCube(state,action){

        state.count++

        let cubeText = state.cubes.find(cube=>cube.id===action.payload.id)

        if (state.count%2===0 && !state.playWithBot){
            if (!cubeText.text)
            cubeText.text ='x'
            else
                state.count-=1
        }

        else if (!state.count%2===0){

            if (!cubeText.text)
                cubeText.text ='o'
            else
                state.count-=1
        }
    },
        findCrossRoad(state, action){
            let cubes = state.cubes

                    if (cubes[0].text === 'o' && cubes[1].text === 'o' && cubes[2].text === 'o'){
                        state.finish=true
                        cubes[0].crossRoad = true
                        cubes[1].crossRoad = true
                        cubes[2].crossRoad = true
                    }
                    else if (cubes[3].text === 'o' && cubes[4].text === 'o' && cubes[5].text === 'o'){
                        state.finish=true
                        cubes[3].crossRoad = true
                        cubes[4].crossRoad = true
                        cubes[5].crossRoad = true
                    }
                    else if (cubes[6].text === 'o' && cubes[7].text === 'o' && cubes[8].text === 'o'){
                        state.finish=true
                        cubes[6].crossRoad = true
                        cubes[7].crossRoad = true
                        cubes[8].crossRoad = true
                    }
                    else if (cubes[0].text === 'o' && cubes[3].text === 'o' && cubes[6].text === 'o'){
                        state.finish=true
                        cubes[0].crossRoad = true
                        cubes[3].crossRoad = true
                        cubes[6].crossRoad = true
                    }
                    else if (cubes[1].text === 'o' && cubes[4].text === 'o' && cubes[7].text === 'o'){
                        state.finish=true
                        cubes[1].crossRoad = true
                        cubes[4].crossRoad = true
                        cubes[7].crossRoad = true
                    }
                    else if (cubes[2].text === 'o' && cubes[5].text === 'o' && cubes[8].text === 'o'){
                        state.finish=true
                        cubes[2].crossRoad = true
                        cubes[5].crossRoad = true
                        cubes[8].crossRoad = true
                    }
                    else if (cubes[0].text === 'o' && cubes[4].text === 'o' && cubes[8].text === 'o'){
                        state.finish=true
                        cubes[0].crossRoad = true
                        cubes[4].crossRoad = true
                        cubes[8].crossRoad = true
                    }
                    else if (cubes[2].text === 'o' && cubes[4].text === 'o' && cubes[6].text === 'o'){
                        state.finish=true
                        cubes[2].crossRoad = true
                        cubes[4].crossRoad = true
                        cubes[6].crossRoad = true
                    }
                
                    else if (cubes[0].text === 'x' && cubes[1].text === 'x' && cubes[2].text === 'x'){
                        state.finish=true
                        cubes[0].crossRoad = true
                        cubes[1].crossRoad = true
                        cubes[2].crossRoad = true
                    }
                    else if (cubes[3].text === 'x' && cubes[4].text === 'x' && cubes[5].text === 'x'){
                        state.finish=true
                        cubes[3].crossRoad = true
                        cubes[4].crossRoad = true
                        cubes[5].crossRoad = true
                    }
                    else if (cubes[6].text === 'x' && cubes[7].text === 'x' && cubes[8].text === 'x'){
                        state.finish=true
                        cubes[6].crossRoad = true
                        cubes[7].crossRoad = true
                        cubes[8].crossRoad = true
                    }

                    else if (cubes[0].text === 'x' && cubes[3].text === 'x' && cubes[6].text === 'x'){
                        state.finish=true
                        cubes[0].crossRoad = true
                        cubes[3].crossRoad = true
                        cubes[6].crossRoad = true
                    }
                    else if (cubes[1].text === 'x' && cubes[4].text === 'x' && cubes[7].text === 'x'){
                        state.finish=true
                        cubes[1].crossRoad = true
                        cubes[4].crossRoad = true
                        cubes[7].crossRoad = true
                    }
                    else if (cubes[2].text === 'x' && cubes[5].text === 'x' && cubes[8].text === 'x'){
                        state.finish=true
                        cubes[2].crossRoad = true
                        cubes[5].crossRoad = true
                        cubes[8].crossRoad = true
                    }

                    else if (cubes[0].text === 'x' && cubes[4].text === 'x' && cubes[8].text === 'x'){
                        state.finish=true
                        cubes[0].crossRoad = true
                        cubes[4].crossRoad = true
                        cubes[8].crossRoad = true
                    }
                    else if (cubes[2].text === 'x' && cubes[4].text === 'x' && cubes[6].text === 'x'){
                        state.finish=true
                        cubes[2].crossRoad = true
                        cubes[4].crossRoad = true
                        cubes[6].crossRoad = true
                    }
            
        },
        finishGame(state, action){
            if (state.finish ||  action.payload){

                if (!action.payload){

                    if (state.count%2===0){
                        state.winX+=1
                    }

                    else{
                        state.winO+=1
                    }
                }
                    state.finish=false
                    state.cubes=[]
                    state.count=0
                }

        },
        retryGame(state){
            state.finish=false
            state.cubes=[]
            state.count=0
            state.winO=0
            state.winX=0
        },

        botDoStep(state, action){
            if (action.payload){
                const emptyCubes = state.cubes.filter(cube=>!cube.text)
                const randomCube =  Math.floor(Math.random()*emptyCubes.length)

                if (!state.finish){
                    emptyCubes[randomCube].text='x'
                    state.count++
                }
            }
        },
        changeGameMod(state, action){
            if (action.payload.target.checked){
                state.playWithBot=true
            }
            else{
                state.playWithBot=false
            }
        }

    }
})

export const {createCubes,findCube,findCrossRoad,finishGame,retryGame,botDoStep,changeGameMod} = cubeSlice.actions

export default cubeSlice.reducer