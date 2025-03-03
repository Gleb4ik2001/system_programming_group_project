import React, { useEffect, useRef } from "react";
import "../css/button.css";

const Button = ({ type, id, className, ripple, onClick, style, children }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const btn = buttonRef.current;
        if (!btn) return;

        const handleClick = (event) => {
            const { clientX, clientY } = event;
            const rect = btn.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width) * 100;
            const y = ((clientY - rect.top) / rect.height) * 100;

            const rippleEffect = document.createElement("span");
            rippleEffect.classList.add("ripple-effect");
            rippleEffect.style.background = btn.dataset.ripple || "#FFF";
            rippleEffect.style.left = `${x}%`;
            rippleEffect.style.top = `${y}%`;

            btn.appendChild(rippleEffect);

            setTimeout(() => {
                rippleEffect.remove();
            }, 700);
        };

        btn.addEventListener("click", handleClick);

        return () => {
            btn.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            type={type || "button"}
            id={id}
            className={`btn btn-ripple ${className || ""}`}
            data-ripple={ripple}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;
