import React, { useContext, useEffect, useState } from 'react'
import flyContext from './context/flyContext';
import SetFlight from './SetFlight';
import Header from './Header';
'use client';

const Text = () => {

    // **Access the Fly Data from Context**
    const { flyData } = useContext(flyContext);

    // **State Variables for Displaying Fly Data**
    const [Altitude, setAltitude] = useState(flyData.Altitude);
    const [sky, setSky] = useState(flyData.ADI);
    const [rotateArrow, setRotateArrow] = useState(flyData.His);

    // **Update State Variables on Fly Data Changes**
    useEffect(() => {
        setAltitude(flyData.Altitude);
    }, [flyData.Altitude]);

    useEffect(() => {
        setSky(flyData.ADI);
    }, [flyData.ADI]);

    useEffect(() => {
        setRotateArrow(flyData.His);
    }, [flyData.HIS]);
    console.log("sky: ", sky);

    // **State Variables for SetFlight Component Visibility**
    const [showOrNotSF, setShowOrNotSF] = useState(null);
    const [buttonText, setButtonText] = useState('set');

    // **Initialize showOrNotSF based on Element ID**
    useEffect(() => {
        setShowOrNotSF(document.getElementById('setFlightId'));
    }, []);

    // **Toggle SetFlight Visibility and Button Text**
    const clicked = () => {
        if (showOrNotSF) {
            showOrNotSF.style.visibility = showOrNotSF.style.visibility === 'hidden' ? 'visible' : 'hidden';
            setButtonText(buttonText === 'set' ? '-' : 'set');
        }
    };

    // **State Variable for Visuals Display (flex or hidden)**
    const [hiddenOrFlex, setHiddenOrFlex] = useState('flex');

    // **Get References to SetFlight and Visuals Elements**
    const setFlightComp = document.getElementById('setFlightId');
    const visuallsHidden = () => {
        setFlightComp.style.visibility === 'visible' ? setHiddenOrFlex('hidden') : setHiddenOrFlex('flex');
    }

    return (
        <div className='select-none'>
            <Header />
            <div id='setFlightId' className='absolute backdrop-blur-sm bg-opacity-65 pt-6 w-full h-full' style={{ visibility: 'hidden' }}>
                <SetFlight display={'none'} />
            </div>
            <div id='plusOrMin' onClick={visuallsHidden} className='mb-12 pl-1 absolute'>
                <button onClick={clicked} className='border border-black bg-slate-700 text-white rounded-b-2xl w-20 px-5 py-2 text-xl'>{buttonText}</button>
            </div>

            <div id='allVisuals' className={`md:mt-28 ${hiddenOrFlex} lg:flex flex flex-wrap justify-around items-center`}>
                {/* Altitud */}
                <div className='Altitud boxBetter onlyTextBox textBox  my-5 text-center h-[300px] w-[300px] rounded-[80px] border border-black'>
                    <div className='flex flex-col mt-[30%] googleFont1'>
                        ALTITUD:
                        <p className='mt-2'>{Altitude}</p>
                    </div>
                </div>

                {/* His */}
                <div className='HIS boxBetter onlyTextBox textBox  my-5 text-center h-[300px] w-[300px] rounded-[80px] border border-black'>
                    <div className='flex flex-col mt-[30%] googleFont1'>
                        HIS:
                        <p className='mt-2'>{rotateArrow}</p>
                    </div>
                </div>

                {/* ADI */}
                <div className='ADI boxBetter onlyTextBox textBox  my-5 text-center h-[300px] w-[300px] rounded-[80px] border border-black'>
                    <div className='flex flex-col mt-[30%] googleFont1'>
                        ADI:
                        <p className='mt-2'>{sky}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Text