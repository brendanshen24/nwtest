"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { redirect } from 'next/navigation'

export default function SongPlayer({ params }) {
    const [songname, setSongname] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(1);

    const callDemo = async (file) => {
        try {
            const response = await fetch('http://localhost:3001/rundemo?file=' + file + '.mid', {
                method: 'GET',
            });
        } catch (error) {
            console.error("Error making get request:", error);
        }
    };

    const callUserInteractive = async (file) => {
        try {
            const response = await fetch('http://localhost:3001/runuserinteractive?file=' + file + '.mid', {
                method: 'GET',
            });
        } catch (error) {
            console.error("Error making get request:", error);
        }
    };

    const callFreePlay = async () => {
        try {
            const response = await fetch('http://localhost:3001/playnote', {
                method: 'GET',
            });
        } catch (error) {
            console.error("Error making get request:", error);
        }
    };

    const callLightsOff = async () => {
        try {
            const response = await fetch('http://localhost:3001/clear', {
                method: 'GET',
            });
        } catch (error) {
            console.error("Error making get request:", error);
        }
    };

    useEffect(() => {
        async function unwrapParams() {
            const resolvedParams = await params;
            setSongname(resolvedParams.songname);
        }
        unwrapParams();
    }, [params]);

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 8));
        setProgress((prev) => Math.min(prev + 1, 8));
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        setProgress((prev) => Math.max(prev - 1, 1));
    };

    const handleBackArrow = () => {
        if (currentStep === 1) {
            redirect('/');
        }
        else{
            handlePrevious();
        }
    }

    const handleStart = () => {
        handleNext();
        callDemo(songname)
    }
    const handleUserInteractive = () => {
        handleNext();
        callUserInteractive(songname);
    }

    const handleWatchDemoAgain = () => {
        setProgress(1);
        setCurrentStep(1);
    }

    const handleFreePlay = () =>{
        handleNext();
        callFreePlay();
    }

    const handleTurnOff = () =>{
        callLightsOff()
        redirect('/')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-4">
            <div className="min-h-screen w-full max-w-sm bg-white flex flex-col items-center p-4 rounded-lg shadow-lg">
                <div className="w-full p-4">
                    <div className="flex justify-between items-end">
                        <button onClick={handleBackArrow}>
                            <Image
                                src="/backicon.svg"
                                alt="back"
                                width={50}
                                height={50}
                                className="mb-4 block"
                            />
                        </button>
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={44}
                            height={44}
                            className="rounded-full mb-4 block"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6 mt-6">
                    {currentStep === 1 && (
                        <div
                            className="flex flex-col justify-center items-center min-w-80 min-h-96 bg-[#f8f8f8] rounded-2xl border border-[#eaeaea] pt-10 pb-10 pr-5 pl-5 gap-5 overflow-hidden mt-6">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-brandgreen text-xs">
                                    Step 1
                                </div>
                                <div className="text-lg font-bold text-brandprimary text-center justify-center w-40">
                                    Listen and Watch
                                </div>
                            </div>
                            <div className="flex">
                                <Image
                                    src="/pianogif.gif"
                                    alt="piano"
                                    width={181.467}
                                    height={49.544}
                                />
                            </div>
                            <div className="text-center text-black text-xs font-normal w-56">
                                Look at your keyboard and watch the demo of this track. Pay attention to the rhythm,
                                beats,
                                and overall composition.
                            </div>
                            <button className="pt-3 pb-3 pl-6 pr-6 bg-brandprimary rounded-lg border border-black" onClick={handleStart}>
                                Start
                            </button>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div
                            className="flex flex-col justify-center items-center min-w-80 min-h-96 bg-[#f8f8f8] rounded-2xl border border-[#eaeaea] pt-10 pb-10 pr-5 pl-5 gap-5 overflow-hidden mt-6">
                            <div className="flex">
                                <Image
                                    src="/eyes.gif"
                                    alt="eyes"
                                    width={181.467}
                                    height={49.544}
                                />
                            </div>

                            <div className="flex flex-col justify-center items-center gap-3">
                                <div className="text-center text-black text-xs font-normal w-56">
                                    Look at your piano
                                </div>
                                <Image
                                    src="/downarrrow.svg"
                                    alt="down"
                                    width={10}
                                    height={10}
                                />

                                <button className="pt-3 pb-3 pl-6 pr-6 bg-brandprimary rounded-lg border border-black"
                                        onClick={handleNext}>
                                    Next Step
                                </button>
                            </div>

                        </div>
                    )}

                    {currentStep === 3 && (
                        <div
                            className="flex flex-col justify-center items-center min-w-80 min-h-96 bg-[#f8f8f8] rounded-2xl border border-[#eaeaea] pt-10 pb-10 pr-5 pl-5 gap-5 overflow-hidden mt-6">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-brandgreen text-xs">
                                    Step 1 Completed
                                </div>
                                <div className="text-lg font-bold text-brandprimary text-center justify-center w-40">
                                    Awesome Job!
                                </div>
                            </div>
                            <div className="flex">
                                <Image
                                    src="/happynote.gif"
                                    alt="happy note"
                                    width={181.467}
                                    height={49.544}
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    className="p-3 bg-secondgreen rounded-lg border border-black flex flex-row gap-2" onClick={handleWatchDemoAgain}>
                                    <Image src="/circlearrow.svg" alt="circlearrow" width={19} height={19}
                                           className="mt-1"/>
                                    <div className="text-brandsecondary">
                                        Watch Again
                                    </div>
                                </button>
                                <button className="pt-3 pb-3 pl-5 pr-5 bg-brandprimary rounded-lg border border-black" onClick={handleNext}>
                                    Next Step
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div
                            className="flex flex-col justify-center items-center min-w-80 min-h-96 bg-[#f8f8f8] rounded-2xl border border-[#eaeaea] pt-10 pb-10 pr-5 pl-5 gap-5 overflow-hidden mt-6">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-brandgreen text-xs">
                                    Step 2
                                </div>
                                <div className="text-lg font-bold text-brandprimary text-center justify-center w-40">
                                    Play Along
                                </div>
                            </div>
                            <div className="flex">
                                <Image
                                    src="/movingpiano.gif"
                                    alt="moving piano"
                                    width={181.467}
                                    height={49.544}
                                />
                            </div>
                            <div className="text-center text-black text-xs font-normal w-56">
                                Now it is your turn! Look at your keyboard and play along where the keys light up. Pause
                                and
                                go at your own pace.
                            </div>
                            <button className="pt-3 pb-3 pl-6 pr-6 bg-brandprimary rounded-lg border border-black" onClick={handleUserInteractive}>
                                Start
                            </button>
                        </div>
                    )}

                    {currentStep === 5 && (
                        <div
                            className="flex flex-col justify-center items-center min-w-80 min-h-96 bg-[#f8f8f8] rounded-2xl border border-[#eaeaea] pt-10 pb-10 pr-5 pl-5 gap-5 overflow-hidden mt-6">
                            <div className="flex">
                                <Image
                                    src="/usepiano.gif"
                                    alt="usepiano"
                                    width={181.467}
                                    height={49.544}
                                />
                            </div>

                            <div className="flex flex-col justify-center items-center gap-3">
                                <div className="text-center text-black text-xs font-normal w-56">
                                    Use your piano
                                </div>
                                <Image
                                    src="/downarrrow.svg"
                                    alt="down"
                                    width={10}
                                    height={10}
                                />
                            </div>

                            <button className="pt-3 pb-3 pl-6 pr-6 bg-brandprimary rounded-lg border border-black"
                                    onClick={handleNext}>
                                Next Step
                            </button>

                        </div>
                    )}

                    {currentStep === 6 && (
                        <div
                            className="flex flex-col justify-center items-center min-w-80 min-h-96 bg-[#f8f8f8] rounded-2xl border border-[#eaeaea] pt-10 pb-10 pr-5 pl-5 gap-5 overflow-hidden mt-6">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-brandgreen text-xs">
                                    Step 2 Completed
                                </div>
                                <div className="text-lg font-bold text-brandprimary text-center justify-center w-40">
                                    You're Doing Great!
                                </div>
                            </div>
                            <div className="flex">
                                <Image
                                    src="/happynote.gif"
                                    alt="happynote"
                                    width={181.467}
                                    height={49.544}
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    className="p-3 bg-secondgreen rounded-lg border border-black flex flex-row gap-2">
                                    <Image src="/circlearrow.svg" alt="circlearrow" width={19} height={19}
                                           className="mt-1"/>
                                    <div className="text-brandsecondary" onClick={handleWatchDemoAgain}>
                                        Watch Again
                                    </div>
                                </button>
                                <button className="pt-3 pb-3 pl-5 pr-5 bg-brandprimary rounded-lg border border-black" onClick={handleNext}>
                                    Next Step
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 7 && (
                        <div
                            className="flex flex-col justify-center items-center min-w-80 min-h-96 bg-[#f8f8f8] rounded-2xl border border-[#eaeaea] pt-10 pb-10 pr-5 pl-5 gap-5 overflow-hidden mt-6">
                            <div className="flex flex-col justify-center items-center">
                                <div className="text-brandgreen text-xs">
                                    Step 3
                                </div>
                                <div className="text-lg font-bold text-brandprimary text-center justify-center w-40">
                                    Show Us What You Know
                                </div>
                            </div>
                            <div className="flex">
                                <Image
                                    src="/pianogif3.gif"
                                    alt="pianogif3"
                                    width={181.467}
                                    height={49.544}
                                />
                            </div>
                            <div className="text-center text-black text-xs font-normal w-56">
                                Based on what you learned, try your best to play the song. It’s okay to make mistakes,
                                you
                                can always check back again with the guided playthrough.
                            </div>
                            <button className="pt-3 pb-3 pl-6 pr-6 bg-brandprimary rounded-lg border border-black" onClick={handleFreePlay}>
                                Start
                            </button>
                        </div>
                    )}

                    {currentStep === 8 && (
                        <div
                            className="flex flex-col justify-center items-center min-w-80 min-h-96 bg-[#f8f8f8] rounded-2xl border border-[#eaeaea] pt-10 pb-10 pr-5 pl-5 gap-5 overflow-hidden mt-6">

                            <div className="flex gap-4">
                                <button
                                    className="p-3 bg-secondgreen rounded-lg border border-black flex flex-row gap-2" onClick={handleWatchDemoAgain}>
                                    <Image src="/circlearrow.svg" alt="circlearrow" width={19} height={19}
                                           className="mt-1"/>
                                    <div className="text-brandsecondary">
                                        Watch Again
                                    </div>
                                </button>
                                <button
                                    className="pt-3 pb-3 pl-5 pr-5 bg-brandprimary rounded-lg border border-black text-xs" onClick={handleTurnOff}>
                                    Finish
                                </button>
                            </div>

                            <div className="flex">
                                <Image
                                    src="/usepiano.gif"
                                    alt="use piano"
                                    width={181.467}
                                    height={49.544}
                                />
                            </div>

                            <div className="flex flex-col justify-center items-center gap-3">
                                <div className="text-center text-black text-xs font-normal w-56">
                                    Use your piano
                                </div>
                                <Image
                                    src="/downarrrow.svg"
                                    alt="down"
                                    width={10}
                                    height={10}
                                />
                            </div>

                        </div>
                    )}

                    <div className="flex items-center w-[346px] h-8 border border-[#EAEAEA] rounded-lg overflow-hidden">
                        {[...Array(8)].map((_, index) => (
                            <div
                                key={index}
                                className={`h-full flex-1 ${
                                    index === 0
                                        ? 'rounded-l-lg'
                                        : index === 7
                                            ? 'rounded-r-lg'
                                            : ''
                                } ${index < progress ? 'bg-brandgreen' : 'bg-gray-300'} transition-all duration-300 border-r ${
                                    index < 7 ? 'border-[#EAEAEA]' : 'border-transparent'
                                }`}
                            ></div>
                        ))}
                    </div>

                    {/*<div className="flex gap-4 mt-6">*/}
                    {/*    <button*/}
                    {/*        onClick={handlePrevious}*/}
                    {/*        disabled={currentStep === 1}*/}
                    {/*        className={`p-3 rounded-lg border ${*/}
                    {/*            currentStep === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-secondgreen'*/}
                    {/*        }`}*/}
                    {/*    >*/}
                    {/*        Previous*/}
                    {/*    </button>*/}
                    {/*    <button*/}
                    {/*        onClick={handleNext}*/}
                    {/*        disabled={currentStep === 8}*/}
                    {/*        className={`p-3 rounded-lg border ${*/}
                    {/*            currentStep === 8 ? 'bg-gray-300 cursor-not-allowed' : 'bg-brandprimary'*/}
                    {/*        }`}*/}
                    {/*    >*/}
                    {/*        Next*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}
