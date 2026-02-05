import { Navbar } from "#components/index.js";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);
const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, index) => (
        <span key={index} className={className} style={{ fontVariationSettings: `wght ${baseWeight}` }}>
            {char == " " ? '\u00A0' : char}
        </span>
    ));
};

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
}
const setupTextHover = (container, type) => {
    if (!container) return;
    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];
    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration, ease: 'power2.out', fontVariationSettings: `"wght" ${weight}`
        })
    }
    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const letterCenter = l + w / 2 - left;
            const distance = Math.abs(mouseX - letterCenter);
            const intensity = Math.exp(-(distance ** 2) / 10000)
            animateLetter(letter, min + (max - min) * intensity)
        }

        )
    }
    const handleMouseLeave = () => letters.forEach((letter) => animateLetter(letter, base, 0.3))

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    }
}

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, "title")
        const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle")

        return () => {
            titleCleanup && titleCleanup();
            subtitleCleanup && subtitleCleanup();
        }
    }, { scope: titleRef })

    return <section id="welcome">
        <p ref={subtitleRef}>
            {renderText("Hi there! Welcome to the portfolio page of", 'text-3xl font-georama', 100,)} </p>
        <h1 ref={titleRef} className="mt-7">
            {renderText("Kisshore Nair", "text-9xl italic font-georama")}
        </h1>
        <div className="small-screen">
            <p>I'm a UM SE Student</p>
        </div>
    </section>
}

export default Welcome;