"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";
import { Link } from 'react-router-dom';
import DefaultLayout from "../layout/DefaultLayout";
import { CardBody, CardContainer, CardItem } from "./3d-card";


export const HeroParallax = ({
    products,
}: {
    products: {
        title: string;
        link: string;
        thumbnail: string;
    }[];
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
        springConfig
    );
    return (
        <DefaultLayout>
            <div
                ref={ref}
                className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
            >
                <Header />
                <motion.div
                    style={{
                        rotateX,
                        rotateZ,
                        translateY,
                        opacity,
                    }}
                    className=""
                >
                    <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                        {firstRow.map((product) => (
                            <ProductCard
                                product={product}
                                translate={translateX}
                                key={product.title}
                            />
                        ))}
                    </motion.div>
                    <motion.div className="flex flex-row  mb-20 space-x-20 ">
                        {secondRow.map((product) => (
                            <ProductCard
                                product={product}
                                translate={translateXReverse}
                                key={product.title}
                            />
                        ))}
                    </motion.div>
                    <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                        {thirdRow.map((product) => (
                            <ProductCard
                                product={product}
                                translate={translateX}
                                key={product.title}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
            <Cards />

        </DefaultLayout>
    );
};

export const Header = () => {
    return (
        <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
            <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
                <div className="text-orange-900">Esprit  Career</div>
                
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
                We provide a platform connecting Esprit students with exciting job opportunities from top companies.
                Our website links passionate developers and designers with the latest technologies and frameworks to incredible career prospects.
                Join us to explore and seize amazing job openings tailored for Esprit students.
            </p>
        </div>
    );
};

export const ProductCard = ({
    product,
    translate,
}: {
    product: {
        title: string;
        link: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className="group/product h-96 w-[30rem] relative flex-shrink-0"
        >
            <Link
                to={product.link}
                className="block group-hover/product:shadow-2xl "
            >
                <img
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="object-cover object-left-top absolute h-full w-full inset-0"
                    alt={product.title}
                />
            </Link>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
                {product.title}
            </h2>
        </motion.div>
    );
};

export const Cards = () => {
    return (
        <div>
            <div className="inline-flex ">
                <div className="mx-5">
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Actia
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Hover over this card to unleash the power of CSS perspective
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src="data:image/jpeg;base64,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"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Contact us →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Apply now
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="mx-5">
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                STMicroelectronics
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Hover over this card to unleash the power of CSS perspective
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src="https://www.reuters.com/resizer/0YIHzZMLyqyQKATS2zueCz8Ir-4=/960x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/KV4XBVTC3RLFRDVFIFTXN4SGL4.jpg"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Contact us →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Apply now
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="mx-5">
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Capgemini Engineering
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Hover over this card to unleash the power of CSS perspective
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src="https://www.capgemini.com/no-no/wp-content/uploads/sites/23/2024/02/PR-financial-image.jpg?w=2880&quality=70"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Contact us →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Apply now
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>
            <div className="inline-flex ">
                <div className="mx-5">
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Linedata
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Hover over this card to unleash the power of CSS perspective
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src="https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/309442744_768021267947951_2538793008150905542_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4LHjtj7LNYkAX8nbC_w&_nc_ht=scontent.ftun9-1.fna&oh=00_AfDOQmckGqcQQgFU-KYTXIlemRjgOC-oVjBcmzYINs6OQg&oe=65F0A9AB"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Contact us →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Apply now
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="mx-5">
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Editrix AI
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Hover over this card to unleash the power of CSS perspective
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src="https://aceternity.com/images/products/thumbnails/new/editrix.png"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Contact us →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Apply now
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="mx-5">
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Sagemcom Tunisie
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Hover over this card to unleash the power of CSS perspective
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src="https://scontent.ftun9-1.fna.fbcdn.net/v/t1.6435-9/44639281_1867987293321350_79426460837740544_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OzbAl-ex3qEAX9tdLSR&_nc_ht=scontent.ftun9-1.fna&oh=00_AfCsjv7RhjWM6veo0aQZkC4wkMlu4cJUmLRi_7oOOTExFw&oe=6613E834"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Contact us →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Apply now
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>
            <div className="inline-flex ">
                <div className="mx-5">
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                NeoXam Tunisie
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Hover over this card to unleash the power of CSS perspective
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src="https://www.recruter.tn/wp-content/uploads/2019/10/0-53.jpg"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Contact us →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Apply now
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="mx-5">
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Safran
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Hover over this card to unleash the power of CSS perspective
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src="https://www.atalayar.com/asset/thumbnail,1920,1080,center,center/media/atalayar/images/2023/12/19/2023121916373421198.jpg"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Contact us →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Apply now
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="mx-5">
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                EY
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Hover over this card to unleash the power of CSS perspective
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img
                                    src="https://images.wsj.net/im-765456?width=700&size=1.4780600461893765"
                                    height="1000"
                                    width="1000"
                                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                >
                                    Contact us →
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Apply now
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>
        </div>
    );
};
