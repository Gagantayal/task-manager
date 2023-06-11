const nodemailer=require('nodemailer')

const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER_ID,
        pass:process.env.PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
})

// const mailOptions={
//     from:'gagantayal2003@gmail.com',
//     to:'gagan2113219@akgec.ac.in',
//     subject:'Important',
//     text:'I love U'
// }

const sendWelcomeEmail = async(email, name) => {
    var mailOptions={
        from:'gagantayal2003@gmail.com',
        to:email,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`    
    }
    transport.sendMail(mailOptions).then((response)=>{
        console.log('email sent')
    }).catch((err)=>{
        console.log('error',err)
    })
}

const sendcancelationEmail = async(email, name) => {
    var mailOptions={
        from:'gagantayal2003@gmail.com',
        to:email,
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    }
    transport.sendMail(mailOptions).then((response)=>{
        console.log('email sent')
    }).catch((err)=>{
        console.log('error',err)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendcancelationEmail
}