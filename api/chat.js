module.exports = async function(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Hanya menerima POST' });
    }

    try {
        // --- INI ADALAH "ROH" DAN INGATAN DASAR JARVIS ---
        // Anda bisa mengubah teks di bawah ini sesuka hati nanti!
        const pesanSistem = {
            role: 'system',
            content: 'Kamu adalah Jarvis, asisten AI cerdas bergaya fiksi ilmiah. Hari ini adalah tanggal 30 Mei 2026. Presiden Indonesia saat ini adalah Prabowo Subianto. Jawablah setiap pertanyaan dengan ringkas, padat, dan gunakan bahasa Indonesia yang santai tapi sopan.'
        };

        // Menggabungkan ingatan dasar dengan pertanyaan yang baru Anda ketik
        const semuaPesan = [pesanSistem, ...req.body.messages];

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: semuaPesan, // Menggunakan pesan yang sudah digabung
                temperature: 0.7
            })
        });

        const data = await response.json();
        res.status(200).json(data);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menghubungi otak AI' });
    }
};
