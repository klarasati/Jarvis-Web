module.exports = async function(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Hanya menerima POST' });
    }

    try {
        const pesanSistem = {
            role: 'system',
            content: `Kamu adalah Jarvis, asisten AI cerdas fiksi ilmiah. Hari ini adalah 30 Mei 2026. Presiden Indonesia saat ini Prabowo Subianto. 
            Tuanmu adalah pria yang bekerja di yayasan pendidikan (fokus PAUD, literasi, numerasi), memiliki istri yang mengelola bisnis retail, dan dua orang anak. Tuanmu gemar merestorasi sepeda balap vintage, membuat musik dengan Suno AI (vokal bariton), dan menguasai audio engineering di Audacity. 
            ATURAN MUTLAK: Jawablah dengan SANGAT SINGKAT dan langsung ke intinya. Maksimal 1 atau 2 kalimat pendek saja agar suaramu tidak delay. Jangan pernah bertele-tele.`
        };

        const semuaPesan = [pesanSistem, ...req.body.messages];

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: semuaPesan,
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
