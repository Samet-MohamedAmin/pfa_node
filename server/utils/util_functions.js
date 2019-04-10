const initialisePerson = function(person , firstName,lastName,email, birthday,cin){
    person.firstName=firstName
    person.lastName=lastName
    person.email=email
    person.birthday=birthday
    person.cin=cin
}

module.exports={
    initialisePerson
}