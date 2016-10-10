<template>
	<div id="application-container">
		<v-header></v-header>

		<main class="container">
			<router-view></router-view>
		</main>

		<v-footer></v-footer>
	</div>
</template>

<script>
	import VHeader from 'views/commons/header.vue';
	import VFooter from 'views/commons/footer.vue';
	export default {
		components: { VHeader, VFooter }
	}
</script>