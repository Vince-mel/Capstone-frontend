import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import 'chart.js/auto';

interface Post {
    id: number;
    title: string;
    addedDate: string;
    users: {
        name: string;
    };
}

interface PaginatedPosts {
    content: Post[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    lastPage: boolean;
    firstPage: boolean;
}

interface ChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        backgroundColor: string;
    }>;
}

const ActivityPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [{
            label: 'Numero di Post per Settimana',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get<PaginatedPosts>("http://localhost:8080/api/posts");
            setPosts(response.data.content); // Aggiornamento per gestire la struttura paginata
            generateChartData(response.data.content); // Passa i post effettivi alla funzione
        } catch (error) {
            console.error("Errore nel recupero dei post:", error);
        }
    };

    const generateChartData = (posts: Post[]) => {
        const counts = posts.reduce((acc: Record<string, number>, post) => {
            const week = moment(post.addedDate).isoWeek();
            const year = moment(post.addedDate).isoWeekYear();
            const weekYearKey = `${year}-W${week}`;
            acc[weekYearKey] = (acc[weekYearKey] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const labels = Object.keys(counts).sort();
        const data = labels.map(label => counts[label]);

        setChartData({
            labels,
            datasets: [{
                label: 'Numero di Post per Settimana',
                data,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }]
        });
    };

    const deletePost = async (postId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${postId}`);
            fetchPosts(); // Ricarica i post dopo l'eliminazione
        } catch (error) {
            console.error("Errore nell'eliminazione del post:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Attività</h2>
            <div>
                <h3 className="font-semibold mb-2">Articoli: </h3>
                <ul>
                    {posts.map(post => (
                        <li key={post.id} className="flex justify-between items-center mb-2">
                            <span>{`#${post.id} ${post.title} - ${moment(post.addedDate).format('DD/MM/YYYY')} - ${post.users.name}`}</span>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() => deletePost(post.id)}
                            >
                                Elimina
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="my-4">
                <h3 className="font-semibold mb-2">Statistiche dei Post: </h3>
                <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
            </div>
        </div>
        
    );
};

export default ActivityPage;
