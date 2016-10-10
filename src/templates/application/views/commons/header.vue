<template>
	<header class="navbar navbar-default">
		<div class="container">
			<a href="#/" class="navbar-brand">
				<img src="../../../assets/img/logo.png" class="pull-left" alt="logo">
				<span><%= appName.toUpperCase() %></span>
				<span style="color: tomato;">{{env}}</span>
			</a>
		</div>
	</header>
</template>

<script>
	export default {
		data() {
			return {
				env: Config.ENV
			}
		}
	}
</script>

<style scoped>
	header {
		margin: 0;
		border: 0;
		border-bottom: solid 1px #e7e7e7;
		border-radius: 0;
	}
	header img {
		width: 40px;
		margin: -10px 5px 0 0;
	}
</style>