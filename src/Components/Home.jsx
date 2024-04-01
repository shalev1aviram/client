import React, { useContext, useEffect, useState } from 'react'
import { CgArrowLongUp, CgArrowLongRight } from 'react-icons/cg';
import flyContext from './context/flyContext';
import SetFlight from './SetFlight';
import Header from './Header';
import { Link } from 'react-router-dom';
'use client';

const Home = () => {
    // Get fly data from context
    const { flyData } = useContext(flyContext);

    // State variables for altitude, sky, and arrow rotation
    const [arrow, setArrow] = useState(130);
    const [sky, setSky] = useState(0);
    const [rotateArrow, setRotateArrow] = useState(0);

    // Update altitude, sky, and rotateArrow based on flyData changes
    useEffect(() => {
        setArrow(flyData.Altitude);
    }, [flyData.Altitude]);

    useEffect(() => {
        setSky(flyData.ADI);
    }, [flyData.ADI]);

    useEffect(() => {
        setRotateArrow(flyData.His);
    }, [flyData.His]);

    console.log("sky: ", sky);

    // Classes for arrow positioning based on altitude
    const arrowClass = arrow <= 333 ? 'mb-4' : arrow <= 666 ? 'mb-3' : arrow <= 1000 ? 'mb-1' : arrow <= 1333 ? 'mb-0' : arrow <= 1666 ? 'mt-[5px]' : arrow <= 2000 ? 'mt-[10px]' : arrow <= 2333 ? 'mt-[15px]' : arrow <= 2666 ? 'mt-[20px]' : 'mt-[25px]';

    // State variables for showing/hiding SetFlight component and button text
    const [showOrNotSF, setShowOrNotSF] = useState(null);
    const [buttonText, setButtonText] = useState('set');

    // Initialize showOrNotSF based on the element with ID 'setFlightId'
    useEffect(() => {
        setShowOrNotSF(document.getElementById('setFlightId'));
    }, []);

    // Function to toggle visibility of SetFlight component and update button text
    const clicked = () => {
        if (showOrNotSF) {
            showOrNotSF.style.visibility = showOrNotSF.style.visibility === 'hidden' ? 'visible' : 'hidden';
            setButtonText(buttonText === 'set' ? '-' : 'set');
        }
    };

    // Get references to SetFlight and Visuals elements
    const setFlightComp = document.getElementById('setFlightId');
    const Visuals = document.getElementById('allVisuals');

    // Function to hide/show Visuals element based on SetFlight visibility
    const hideVisuals = () => {
        setFlightComp.style.visibility === 'visible' ? Visuals.style.display = 'none' : Visuals.style.display = 'flex';
    }

    //////////////////

    return (
        <div className='select-none'>
            <Header />

            <div id='setFlightId' className='absolute bg-slate-200 bg-opacity-80 pt-6 w-full h-full' style={{ visibility: 'hidden' }}>
                <div>
                    <SetFlight display={'none'} />
                </div>
            </div>

            <div id='plusOrMin' onClick={hideVisuals} className='mb-12 pl-1 absolute'>
                <button onClick={clicked} className='border border-black bg-slate-700 text-white rounded-b-2xl w-20 px-5 py-2 text-xl'>{buttonText}</button>
            </div>

            <div className='h-10'></div>

            <div id='allVisuals' className='flex flex-wrap justify-around items-center'>
                <div>
                    <div className='text-center googleFont1 text-lg'>Altitude</div>
                    <div id='AltitudId'>
                        <div className='Altitud boxBetter relative my-3 h-[500px] w-[200px] border border-black '>
                            <ul className='flex flex-col items-center h-[400px] '>
                                <li>3000</li>
                                <li className='mt-[1.80rem]'>2666</li>
                                <li className='mt-[1.80rem]'>2333</li>
                                <li className='mt-[1.80rem]'>2000</li>
                                <li className='mt-[1.80rem]'>1666</li>
                                <li className='mt-[1.80rem]'>1333</li>
                                <li className='mt-[1.80rem]'>1000</li>
                                <li className='mt-[1.80rem]'>666</li>
                                <li className='mt-[1.80rem]'>333</li>
                                <li className='mt-[1.80rem]'>0</li>
                            </ul>
                            <div id='arrowId'
                                className='duration-700 left-12 absolute ' style={{ transform: 'translate(0, -50%)', top: `${(3000 - arrow) / 3000 * 100}%` }}>
                                <CgArrowLongRight className={`${arrowClass}`} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className='mt-10 md:mt-0 border-t md:border-none'>
                    <div className='text-center googleFont1 text-lg mt-5 md:mt-0'>HIS</div>
                    <div style={{ rotate: `-${rotateArrow}deg` }} className='HIS boxBetter my-3 h-[400px] w-[400px] rounded-full border border-black'>
                        <ul>
                            <li style={{ rotate: `${rotateArrow}deg` }} className='flex justify-center text-center pt-[5px] mt-2 mx-auto'>360</li>
                            <div className='flex items-center justify-between mt-[127px] px-5'>
                                <li style={{ rotate: `${rotateArrow}deg` }} className=' text-center pt-[5px]'>270</li>
                                <div>
                                    <CgArrowLongUp style={{ rotate: `${rotateArrow}deg` }} size="70px" color="black" />
                                </div>

                                <li style={{ rotate: `${rotateArrow}deg` }} className=' text-center pt-[5px]' >90</li>
                            </div>
                            <li style={{ rotate: `${rotateArrow}deg` }} className='flex justify-center mt-[130px] text-center pt-[5px] mx-auto'>180</li>
                        </ul>
                    </div>
                </div>

                <div className='mt-10 md:mt-0 border-t md:border-none'>
                    <div className='text-center googleFont1 text-lg mt-5 md:mt-0'>ADI</div>
                    <div className={`ADI boxBetter overflow-hidden my-3 h-[400px] w-[400px] rounded-full border border-black`}>
                        <div className='h-full'>
                            <div className='sky bg-blue-800 bg-cover bg-center duration-500  flex justify-center items-center' style={{ height: `${sky}%` }}>
                                <p className='hover-visible-sky'>Sky : {sky}%</p>
                            </div>
                            <div className='ground bg-green-700 bg-cover border-t-2 border-black duration-500 flex justify-center items-center h-max' style={{ height: `${100 - sky}%` }}>
                                <p className='hover-visible-ground'>Ground : {100 - sky}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ADI visual */}
            {/* <div className={`ADI boxBetter overflow-hidden my-5 h-[400px] w-[400px] rounded-full border border-black`}>
                    <div className='h-full'>
                        <div className='bg-[url(src/images/skyFromPlnCpy.jpg)] bg-cover bg-center' style={{ height: `${sky}%` }}></div>
                        <div className='bg-[url(src/images/townFromPlnCpy.jpg)] bg-cover border-black' style={{ height: `${100 - sky}%` }}></div>
                    </div>
                </div> */}

        </div>
    )
}
export default Home