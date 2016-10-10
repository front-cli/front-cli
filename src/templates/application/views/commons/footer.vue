<template>
	<footer class="navbar navbar-default">
		<div class="container">
			<div class="row">
				<div class="col-sm-6">
					<p class="navbar-text">{{organization}}</p>
				</div>
				<div class="col-sm-6">
					<p class="navbar-text pull-right">{{version}}</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	import pkg from 'package.json';

	export default {
		data() {
			return {
				organization: pkg.organization,
				version: pkg.version
			}
		}
	}
</script>

<style scoped>
	footer {
		margin: 0;
		border: 0;
		border-top: solid 1px #e7e7e7;
		border-radius: 0;
	}
	footer .navbar-text {
		margin: 15px 0;
	}
</style>