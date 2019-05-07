const initialisePerson = function(person , firstName,lastName,email, birthday,cin,gender){
    person.firstName=firstName
    person.lastName=lastName
    person.email=email
    person.birthday=birthday
    person.cin=cin
    person.gender=gender
}

module.exports={
    initialisePerson
}