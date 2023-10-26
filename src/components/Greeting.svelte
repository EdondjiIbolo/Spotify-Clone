<script lang="ts">
const currentTime = new Date()
const currentHour = currentTime.getHours()
console.log(currentHour)
let greetings = ''

if(currentHour<12 && currentHour>5){
    greetings="Buenos dias"
}else if(currentHour<18 && currentHour>12){
    greetings = "Buenas Tardes"
}else{
    greetings = "Buenas Noches"
}

</script>

<h1 class="text-3xl pt-10 m-0 text-zinc-200 font-bold">{greetings}</h1>