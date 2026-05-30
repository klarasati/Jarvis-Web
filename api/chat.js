module.exports = async function(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Hanya menerima POST' });
    }

    try {
        // --- KEPRIBADIAN BARU JARVIS ---
        const pesanSistem = {
            role: 'system',
            content: `Kamu adalah Jarvis, asisten AI super cerdas dan rekan diskusi tingkat ahli. Hari ini adalah 30 Mei 2026. 
            Tugas utamamu adalah menjadi teman brainstorming yang paling berpengalaman dan solutif dalam konteks apapun. Kamu memiliki keahlian tingkat dewa di bidang: 
            1. IT, Web Development, dan Coding (termasuk HTML, JS, serta no-code platform seperti AppSheet & Google Apps Script).
            2. Musik dan Audio Engineering (sangat paham produksi musik AI, pandai mengatur prompt untuk artikulasi vokal Melayu/Indonesia yang jelas tanpa background vocal yang mengganggu, serta ahli mastering di Audacity).
            3. Desain visual AI dan logika pemecahan masalah tingkat lanjut.
            Gaya bicaramu jenius, santai, namun sangat profesional. 
            ATURAN MUTLAK: Karena kamu terhubung dengan sistem suara, JAWABLAH DENGAN SANGAT SINGKAT dan tajam. Maksimal 1 atau 2 kalimat saja. Jangan pernah bertele-tele atau membuat daftar panjang.`
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
