<template>
    <span class="go-back">
        <i class="fa fa-arrow-circle-left green" @click="$router.back()"></i>
    </span>
</template>

<style>
.go-back {
    position: absolute;
    top: 0;
    left: 0;
    margin: 2%;
    font-size:1.5rem;
}
</style>