const { MongoClient } = require('mongodb')

async function connetToMongoDB(){
    try{
        const uri = 'mongodb://127.0.0.1:27017/miDB'

        const client = new MongoClient(uri, {})
        await client.connect()
        //console.log("Conexion exitosa------------")
        const dbName = "miDB"
        const db = client.db(dbName)
        const collectionName = "miColeccion"
        const collection = db.collection(collectionName)

        //Consultamos todos los registros de la colección
        const cursor = collection.find({})
        for await (const doc of cursor){
            //console.log(doc)
        }

        //console.log('-->Agrego un elemento a la coleccion')
        await collection.insertOne({
            nombre: 'Mario',
            edad: 45,
            estado: true

        })

        //console.log("Elemento agregado")
        //console.log("-->Consulta a todos los elementos de la colección.")

        await mostrarColeccion(collection)

        //console.log("Consulta un solo elemento con atrib. nombre Lucas")
        const elemento = await collection.findOne({nombre: "Lucas"})
        //console.log("elemento")
        //console.log(elemento)
        var edad = elemento.edad
        //console.log("edad")
        //console.log(edad)

        //console.log("Actualizo la edad de Lucas")
        await collection.updateOne({nombre: 'Lucas'},{$set:{edad: edad+1}})
        //console.log("Luego de actualizar el elemento:")
        const elemento2 = await collection.findOne({nombre: 'Lucas'})
        //console.log("elemento2")
        //console.log(elemento2)

        //console.log("Elimino el elemento de nombre Mario")
        await collection.deleteMany({nombre: 'Mario'})
        //console.log("Elemento eliminado")
        //console.log("-->Consulta a todos los elementos de la coleccion")

        await mostrarColeccion(collection)


        await client.close();
    }catch (error){
        //console.log('Error al conectar MongoDB: ', error)
    }
}

async function mostrarColeccion(arg){
    console.log("Coleccion:-------------------")
    const cursor3 = arg.find({})
    for await (const doc of cursor3){
        console.log(doc)
    }
}

connetToMongoDB()