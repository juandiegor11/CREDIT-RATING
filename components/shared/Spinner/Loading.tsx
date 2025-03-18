import { stat } from 'fs';
import React from 'react';

const Loading = () => {
    const [open, setOpen] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <h1>Loading...</h1>
            <progress value={progress} max={100} />
        </div>
    );
}

export default Loading;