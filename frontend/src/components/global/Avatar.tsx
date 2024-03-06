import React, { useState, useEffect } from 'react';

interface IProps {
    name?: string;
    className?: string;
    size?: string;
    textSize?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Avatar = ({
    name,
    className = "",
    size = "w-8 h-8 md:w-10 md:h-10", // Assicurati che queste dimensioni siano adatte per la tua UI
    textSize = "text-lg md:text-xl",
    onClick,
}: IProps) => {
    // Utilizza il nome come seed per generare un avatar random, o usa una stringa random se il nome non è disponibile
    const [avatarUrl, setAvatarUrl] = useState(`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || Math.random().toString())}.svg`);

    // Aggiorna l'avatar quando il nome cambia
    useEffect(() => {
        setAvatarUrl(`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || Math.random().toString())}.svg`);
    }, [name]);

    return (
        <div onClick={onClick} className={`rounded-full overflow-hidden ${size} ${className} ${textSize} flex items-center justify-center`}>
            <img src={avatarUrl} alt="Avatar" className="object-cover" />
        </div>
    );
};

export default Avatar;