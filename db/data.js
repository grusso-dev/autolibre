const db = {
    users: [
        {
            email: "juanperez@gmail.com",
            nombre: "juanperez",
            contrasenia: "juanito10",
            fechaNacimiento: "1990-05-25",
            numeroDocumento: 87654321,
            foto: "juanita.jpeg"
        },
        {
            email: "mariagomez@gmail.com",
            nombre: "mariagomez",
            contrasenia: "maria123",
            fechaNacimiento: "1985-12-12",
            numeroDocumento: 98765432,
            foto: "maria.png"
        },
        {
            email: "pedroaguilar@gmail.com",
            nombre: "pedroaguilar",
            contrasenia: "pedrito123",
            fechaNacimiento: "1978-08-18",
            numeroDocumento: 76543210,
            foto: "pedro.png"
        },
        {
            email: "lauratorres@gmail.com",
            nombre: "lauratorres",
            contrasenia: "laura456",
            fechaNacimiento: "1982-04-30",
            numeroDocumento: 65432109,
            foto: "laura.png"
        },
        {
            email: "carlosrojas@gmail.com",
            nombre: "carlosrojas",
            contrasenia: "carlos789",
            fechaNacimiento: "1975-11-08",
            numeroDocumento: 54321098,
            foto: "carlos.png"
        }
    ],

    productos: [
        {
            imagen: "foto3.png",
            nombre: "Lamborghini Veneno",
            descripcion: "Auto de lujo traido directamente de Italia",
            comentarios: [
                {
                    nombre: "juanperez",
                    comentario: "Buen chasis",
                    foto: "juanita.jpeg"
                },
                {
                    nombre: "mariagomez",
                    comentario: "¿Hacen descuentos a gente nacida en Italia?",
                    foto: "rob.png"
                },
                {
                    nombre: "carlosrojas",
                    comentario: "Espectacular el color!",
                    foto: "mike.jpeg"
                }
            ]
            
        },
        {
            imagen: "foto4.png",
            nombre: "Porsche GT3 RS",
            descripcion: "Auto de lujo traido directamente de Alemania",
            comentarios: [
                {
                    nombre: "pedroaguilar",
                    comentario: "Comentario 1",
                    foto: "angel.avif"
                },
                {
                    nombre: "lauratorres",
                    comentario: "Comentario 2",
                    foto: "julieta.avif"
                }
            ]
        },
        {
            imagen: "foto2.jpeg",
            nombre: "Pagani Zonda",
            descripcion: "Magia italiana",
            comentarios: [
                {
                    nombre: "carlosrojas",
                    comentario: "Hermoso",
                    foto: "mike.jpeg"
                },
                {
                    nombre: "juanperez",
                    comentario: "Buen chasis",
                    foto: "juanita.jpeg"
                }
            ]
        },
        {
            imagen: "foto1.png",
            nombre: "Ferrari F90",
            descripcion: "320 caballos de fuerza",
            comentarios: [
                {
                    nombre: "mariagomez",
                    comentario: "Buena nave",
                    foto: "rob.jpg"
                },
                {
                    nombre: "pedroaguilar",
                    comentario: "¿Permutas?",
                    foto: "angel.avif"
                }
            ]
        }
    ]
};


module.exports = db; 