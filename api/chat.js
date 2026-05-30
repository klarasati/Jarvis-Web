export default async function handler(req, res) {
    // Pastikan hanya menerima perintah pengiriman pesan (POST)
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Hanya menerima POST' });
    }

    try {
        // Mengirim pesan dari tampilan depan ke otak AI (Groq)
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                // Di sinilah Kunci Rahasia Anda disembunyikan oleh sistem
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192', // Model AI yang sangat cepat dan gratis
                messages: req.body.messages,
                temperature: 0.7
            })
        });

        const data = await response.json();
        // Mengirimkan jawaban AI kembali ke tampilan depan
        res.status(200).json(data);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal menghubungi otak AI' });
    }
}
