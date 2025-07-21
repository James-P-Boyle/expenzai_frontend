import Image from 'next/image'

export default function HeroImages({ }) {

    return (
        <div className="relative flex justify-center order-1 lg:order-2 min-h-[350px]">

            {/* Mobile Only - Responsive sizing */}
            <div className="block lg:hidden">
                <Image
                    src="/images/phone-upload-light.png"
                    alt="ExpenzAi Mobile App"
                    width={280}
                    height={560}
                    className="block dark:hidden drop-shadow-2xl w-auto h-auto max-w-[280px] max-h-[360px] md:max-h-[560px] upload-image"
                    priority
                    style={{
                        width: 'auto',
                        height: 'auto',
                    }}
                />
                <Image
                    src="/images/phone-upload-dark.png"
                    alt="ExpenzAi Mobile App"
                    width={280}
                    height={560}
                    className="hidden dark:block drop-shadow-2xl w-auto h-auto max-w-[280px] max-h-[560px] upload-image"
                    priority={false}
                    style={{
                        width: 'auto',
                        height: 'auto',
                    }}
                />
            </div>

            {/* Desktop/Tablet - Responsive scaling */}
            <div className="hidden lg:block relative">
                {/* Desktop Images - Scale with screen size */}
                <div className="relative">
                    <Image
                        src="/images/dash-d-light.png"
                        alt="ExpenzAi Desktop Dashboard"
                        width={500}
                        height={343}
                        className="block dark:hidden drop-shadow-xl w-auto h-auto 
                            lg:max-w-[500px] lg:max-h-[343px]
                            xl:max-w-[600px] xl:max-h-[412px]
                            2xl:max-w-[700px] 2xl:max-h-[480px]"
                        priority
                    />

                    <Image
                        src="/images/dash-d-dark.png"
                        alt="ExpenzAi Desktop Dashboard"
                        width={500}
                        height={343}
                        className="hidden dark:block drop-shadow-xl w-auto h-auto 
                            lg:max-w-[500px] lg:max-h-[343px]
                            xl:max-w-[600px] xl:max-h-[412px]
                            2xl:max-w-[700px] 2xl:max-h-[480px]"
                        priority
                    />
                </div>

                {/* Mobile Images - Overlapping Layer */}
                <div className="absolute -bottom-12 -left-4 lg:-bottom-12 xl:-bottom-14 2xl:-bottom-16">
                    <Image
                        src="/images/phone-upload-light.png"
                        alt="ExpenzAi Mobile App"
                        width={180}
                        height={360}
                        className="block dark:hidden drop-shadow-2xl -rotate-6 w-auto h-auto
                            lg:max-w-[180px] lg:max-h-[360px]
                            xl:max-w-[220px] xl:max-h-[440px]
                            2xl:max-w-[260px] 2xl:max-h-[520px]"
                        priority
                    />

                    <Image
                        src="/images/phone-upload-dark.png"
                        alt="ExpenzAi Mobile App"
                        width={180}
                        height={360}
                        className="hidden dark:block drop-shadow-2xl -rotate-6 w-auto h-auto
                            lg:max-w-[180px] lg:max-h-[360px]
                            xl:max-w-[220px] xl:max-h-[440px]
                            2xl:max-w-[260px] 2xl:max-h-[520px]"
                        priority
                    />
            </div>


            </div>
        </div>
    )
}