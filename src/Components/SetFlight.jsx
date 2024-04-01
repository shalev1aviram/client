import React, { useContext, useState } from 'react'
import axios from 'axios'
import Loading from '../shared/Loading'
import { useForm } from 'react-hook-form'
import flyContext from './context/flyContext'
import { useNavigate } from 'react-router-dom'
import { REGISTER_FLY_URL } from '../Routes/urls'
import { getAxiosStatus } from '../utils/utils'

const SetFlight = ({ display }) => {
    // **Context and Form State**
    const { flyData, setflyData } = useContext(flyContext)
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    // **Navigation and Error Handling**
    const nav = useNavigate()
    const update = async (data) => {
        const detailsUpdate = data
        console.log("update: ", detailsUpdate);

            // Update fly data in context
        setflyData({ ...flyData, ...detailsUpdate })

        try {
            await axios.post(REGISTER_FLY_URL, data)
            nav('/visual') //Navigate visuals page on success
        } catch (error) {
            if (getAxiosStatus(error) == 409) { 
                setError("error", { message: "Altitude is already exist" })
            }
            else {
                console.log(getAxiosStatus(error) + ": ", error); // Log error details
                setError("error", { message: "network error" })
            }
        }
    }


    return (
        <div className='select-none'>
            <img src="src/images/movingBg.png" alt="plane1" width={200} className='airplane absolute mt-60' />
            <img src="src/images/movingBg.png" alt="plane2" width={70} className='airplane3 absolute mt-32' />
            <img src="src/images/movingBg.png" alt="plane3" width={300} className='airplane2 absolute mt-80' />

            <div className='invisible h-20' style={{ display: `${display}` }}></div>
            <Loading on={isSubmitting} />
            <div className="max-w-md mx-auto select-none mt-8 bg-slate-500 bg-[url(src/images/plnBg3.jpg)] bg-blend-lighten bg-cover bg-center brightness-100 rounded-lg">
                <form onSubmit={handleSubmit(update)} className=" shadow-md rounded px-8 pt-6 pb-3 mb-4 items-center">
                    {/* <div className='w-full text-center'><h1 className='text-black font-medium text-3xl pb-8'>Start Fly</h1></div> */}
                    <div style={{ boxShadow: '5px 5px 29px 2px rgba(0,0,0,0.55)' }} className="mb-2 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded  backdrop-blur-xl bg-gray-300">
                        <label className="ps-1 block text-gray-700 text-sm font-bold  border-b border-gray-700 w-fit">
                            Altitude (0-3000)
                        </label>
                        <input
                            type='number'
                            className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:border-none focus:outline-none "
                            {...register("Altitude", {
                                required: true,
                                validate: (value) => {
                                    if ((value < 0)) return "Altitude most be Minimum 0"
                                    if ((value > 3000)) return "Altitude cant reach 3000"
                                }
                            })}
                        />
                    </div>
                    <div className='min-h-9 text-center mb-1'>{errors.Altitude && <span className='text-xs font-medium p-2 text-black'>{errors.Altitude.message}</span>}</div>
                    <div style={{ boxShadow: '5px 5px 29px 2px rgba(0,0,0,0.55)' }} className="mb-2 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded backdrop-blur-xl bg-gray-300">
                        <label className="ps-1 block text-gray-700 text-sm font-bold border-b border-gray-700 w-fit">
                            His (0-360)
                        </label>
                        <input
                            type="number"
                            className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:border-none focus:outline-none"
                            {...register("His", {
                                required: true,
                                validate: (value) => {
                                    if ((value < 0)) return "His most be Minimum 0"
                                    if ((value > 360)) return "His cant reach 360"
                                }
                            })}
                        />
                    </div>
                    <div className='min-h-9 text-center mb-2'>{errors.His && <span className='text-xs font-medium backdrop-brightness-125 text-black'>{errors.His.message}</span>}</div>
                    <div style={{ boxShadow: '5px 5px 29px 2px rgba(0,0,0,0.55)' }} className="mb-2 pb-2 border-b-2 border-black shadow-md p-1 pt-3 rounded backdrop-blur-xl  bg-gray-200">
                        <label className="ps-1 block text-gray-700 text-sm font-bold border-b border-black w-fit ">
                            ADI (0-100)
                        </label>
                        <input
                            type="number"
                            className="bg-transparent appearance-none border-none w-full px-3 pt-2 pb-1 text-gray-700 focus:border-none focus:outline-none"
                            {...register("ADI", {
                                required: true,
                                validate: (value) => {
                                    if ((value < 0)) return "ADI most be Minimum 0"
                                    if ((value > 100)) return "ADI cant reach 100"
                                }
                            })}
                        />
                    </div>
                    <div className='min-h-9 text-center mb-0'>{errors.ADI && <span className='text-xs font-medium backdrop-brightness-125 text-black'>{errors.ADI.message}</span>}</div>

                    <div className='flex justify-around'>
                        <div>
                            <p className='p-2 text-2xl text-gray-700 googleFont1'>
                                SET  A (:<br /> FLIGHT
                            </p>
                        </div>
                        <div className="basis-1/2 justify-center items-center pb-2 text-center w-full ">
                            <button style={{ boxShadow: '2px 2px 10px 5px rgba(0,0,0,0.50)' }} type="submit" className="w-3/4 h-3/4 backdrop-brightness-95 text-gray-900 hover:scale-105 transition duration-300 ease-in-out font-bold py-2 my-3 px-5 rounded">
                                Submit
                            </button>
                        </div>
                    </div>

                    {errors.error && <span className='text-black'>{errors.error.message}</span>}
                </form>
            </div>
        </div>
    )
}
export default SetFlight

SetFlight.jsx




