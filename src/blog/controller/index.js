const {admin, db} = require("../../firebase-config")

const getBlogById = async (req, res) => {
    try {
        const blogRef = db.collection('blogs').doc(req.params.id);
        const blog = await blogRef.get()
        if (!blog.exists) {
            return res.status(404).json({
                data: "Blog does not exists"
            })
          }
        return res.status(200).json({
            id: blogRef.id,
            data: blog.data()
        })
        
    } catch (e) {
        return res.status(400).end()
    }
}

const createBlog = async (req, res) => {
    const {title, body, author} = req.body
    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    if (!title && !body && !author && !timestamp) {
        return res.status(404).json({
            data: "Please include all fields"
        })
    }

    try {
        const blogRef = await db.collection('blogs').add({...req.body, timestamp});
        const blog = await blogRef.get()
        return res.status(200).json({
            id: blogRef.id,
            data: blog.data()
        })
    } catch(e) {
        return res.status(404).end()
    }

}

const updateBlogById = async (req, res) => {
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    try {
        const blogRef =  db.collection('blogs').doc(req.params.id)
        const blogData = await blogRef.update({...req.body, timestamp})
        const blog = await blogRef.get()
        return res.status(200).json({
            id: blogRef.id,
            data: blog.data()
        })
    } catch(e) {
        return res.status(404).end()
    }
}

const deleteBlogById = async (req, res) => {
    try {
        await db.collection('blogs').doc(req.params.id).delete();
        res.status(200).send({
            data: "Successfully deleted"
        })
    } catch(e) {
        return res.status(404).end()
    }
}

module.exports = {
    getBlogById,
    createBlog,
    updateBlogById,
    deleteBlogById
}