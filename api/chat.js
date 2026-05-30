module.exports = async function(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Hanya menerima POST' });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant', // Otak terbaru yang aktif
                messages: req.body.messages,
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
