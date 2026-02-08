import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { dockApps } from "../constants/index.js";
import { Tooltip } from "react-tooltip";

gsap.registerPlugin(useGSAP);

const Dock = () => {
    const dockRef = useRef(null);

    useGSAP(
        () => {
            const dock = dockRef.current;
            if (!dock) return;

            const icons = dock.querySelectorAll(".dock-icon");

            const animateIcons = (mouseX) => {
                const dockRect = dock.getBoundingClientRect();

                icons.forEach((icon) => {
                    const rect = icon.getBoundingClientRect();

                    const center = rect.left - dockRect.left + rect.width / 2;
                    const distance = Math.abs(mouseX - center);

                    const intensity = Math.exp(-(distance ** 2.35) / 20000);

                    gsap.to(icon, {
                        scale: 1 + 0.25 * intensity,
                        y: -15 * intensity,
                        duration: 0.2,
                        ease: "power2.out",
                    });
                });
            };

            const handleMouseMove = (e) => {
                const dockRect = dock.getBoundingClientRect();
                animateIcons(e.clientX - dockRect.left);
            };

            const resetIcons = () => {
                icons.forEach((icon) => {
                    gsap.to(icon, {
                        scale: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                });
            };

            dock.addEventListener("mousemove", handleMouseMove);
            dock.addEventListener("mouseleave", resetIcons);

            return () => {
                dock.removeEventListener("mousemove", handleMouseMove);
                dock.removeEventListener("mouseleave", resetIcons);
            };
        },
        { scope: dockRef }
    );

    const toggleApp = () => { };

    return (
        <section id="dock" className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50">
            <div ref={dockRef} className="dock-container flex items-end gap-2 bg-white/20 backdrop-blur-md p-2 rounded-2xl">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon w-14 h-14 3xl:w-20 3xl:h-20"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                className={`w-full h-full object-contain ${!canOpen ? "opacity-60" : ""}`}
                            />
                        </button>
                    </div>
                ))}

                <Tooltip id="dock-tooltip" place="top" />
            </div>
        </section>
    );
};

export default Dock;
