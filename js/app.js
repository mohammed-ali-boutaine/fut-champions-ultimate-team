
fetch('http://localhost:3000/players')
  .then((response) => response.json())
  .then((data) =>{ 
     
     console.log('Products:', data)


})
  .catch((error) => {
     console.error('Error fetching products:', error)
     alert("server problem")


});
