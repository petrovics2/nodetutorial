const express = require('express');
const Joi = require('joi');

const app = express();


app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

app.get('/', (req, res) => {
    res.send('Hello world!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        //404 response code
        res.status(404).send('The course with the given ID was not found');
    }
    else {
        res.send(course);
    }
});

app.post('/api/courses', (req, res) => {
    //Validate input
    const {error} = validateCourse(req.body); //result.error

    if (error) {
        //If invalid, return 400 - Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    const course = courses.find(c=> c.id == parseInt(req.params.id));
    //If not existing, return 404
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
    }
    else {
        //Validate input
        const {error} = validateCourse(req.body); //result.error

        if (error) {
            //If invalid, return 400 - Bad request
            res.status(400).send(error.details[0].message);
        } else {
            //Update course
            course.name = req.body.name;
            //Return the update course
            res.send(course);
        }
    }

});

app.delete('/api/courses/:id', (req, res) => {
    //Look up the course
    const course = courses.find(c=> c.id == parseInt(req.params.id));
    //Not existing, return 404
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
    } else {
        //Delete
        const index = courses.indexOf(course);
        courses.splice(index,1);
        //Return the same course
        res.send(course);
    }
});

// PORT - environmental variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course.body, schema);
}