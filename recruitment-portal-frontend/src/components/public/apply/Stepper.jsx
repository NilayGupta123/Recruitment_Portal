import {User, Briefcase, FileText, CheckCircle2} from "lucide-react";
export default function Stepper({step}) {

    const steps = [

        {

            number: 1,

            title: "Personal",

            icon: <User size={20} />,

        },

        {

            number: 2,

            title: "Professional",

            icon: <Briefcase size={20} />,

        },

        {

            number: 3,

            title: "Resume",

            icon: <FileText size={20} />,

        },

        {

            number: 4,

            title: "Review",

            icon: <CheckCircle2 size={20} />,

        },

    ];

    return (

        <div className="bg-slate-100 px-10 py-8">

            <div className="flex justify-between items-center">

                {steps.map((item, index) => (

                    <div
                        key={item.number}
                        className="flex items-center flex-1"
                    >

                        <div className="flex flex-col items-center w-full">

                            <div

                                className={`

                                w-14

                                h-14

                                rounded-full

                                flex

                                items-center

                                justify-center

                                font-bold

                                transition

                                ${step >= item.number

                                        ? "bg-blue-700 text-white"

                                        : "bg-white text-gray-500"}

                                `}

                            >

                                {item.icon}

                            </div>

                            <p className="mt-3 font-semibold">

                                {item.title}

                            </p>

                        </div>

                        {index !== steps.length - 1 && (

                            <div

                                className={`

                                h-1

                                flex-1

                                ${step > item.number

                                        ? "bg-blue-700"

                                        : "bg-gray-300"}

                                `}

                            />

                        )}

                    </div>

                ))}

            </div>

        </div>

    );

}