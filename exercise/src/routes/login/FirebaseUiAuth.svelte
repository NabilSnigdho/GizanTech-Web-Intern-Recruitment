<script context="module" lang="ts">
	declare const firebaseui: typeof import('firebaseui');
</script>

<script lang="ts">
	import { initFirebase } from '$lib/firebase/firebase.client';
	import { loadScriptOnce } from '$lib/helpers/loader';
	import {
		EmailAuthProvider,
		FacebookAuthProvider,
		GithubAuthProvider,
		GoogleAuthProvider,
		PhoneAuthProvider,
		TwitterAuthProvider,
		type UserCredential
	} from 'firebase/auth';
	import { createEventDispatcher, onMount } from 'svelte';
	/* global firebaseui */

	export let languageCode = 'en';
	export let signInWith: {
		google?: boolean;
		facebook?: boolean;
		twitter?: boolean;
		github?: boolean;
		emailPassword?: boolean;
		emailPasswordless?: boolean;
		phone?: boolean;
		anonymous?: boolean;
	} = { google: true, emailPasswordless: true };
	export let tosUrl: firebaseui.auth.Config['tosUrl'] = undefined; // '.../terms' | () => window.location.assign("your-terms-url");
	export let privacyPolicyUrl: firebaseui.auth.Config['privacyPolicyUrl'] = undefined;
	export let signInSuccessUrl: string | undefined = undefined;
	export let continueUrl: string | undefined = undefined;
	export let forceSameDevice = false;

	const dispatch = createEventDispatcher<{
		success: string | null;
		authresult: UserCredential;
	}>();
	let uiShown = false;
	let firebaseUiLoaded = false;
	let container: HTMLDivElement;
	let ui: firebaseui.auth.AuthUI;
	const { auth } = initFirebase();

	onMount(async () => {
		await loadScriptOnce('https://www.gstatic.com/firebasejs/9.8.2/firebase-app-compat.js');
		await loadScriptOnce('https://www.gstatic.com/firebasejs/9.8.2/firebase-auth-compat.js');
		await loadScriptOnce(
			`https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth__${languageCode}.js`
		);
		firebaseUiLoaded = true;
	});

	let uiConfig: firebaseui.auth.Config;
	$: if (firebaseUiLoaded) {
		uiConfig = {
			callbacks: {
				signInSuccessWithAuthResult: (authResult) => {
					dispatch('authresult', authResult);
					dispatch('success', 'auth success');
					return !!signInSuccessUrl; // if  true uses first signInSuccessUrl parameter given in the URL then the default signInSuccessUrl given in config here; if false, page won't redirect automatically
				},
				signInFailure: (error) => {
					// Some unrecoverable error occurred during sign-in.
					// Return a promise when error handling is completed and FirebaseUI
					// will reset, clearing any UI. This commonly occurs for error code
					// 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
					// occurs. Check below for more details on this.
					return handleUIError(error);
				},
				uiShown: () => (uiShown = true)
			},
			credentialHelper: firebaseui.auth.CredentialHelper.NONE, // disabling for moment if it makes harder with redirect (is ok if works through popup)
			signInFlow: 'popup',
			signInOptions: [],
			signInSuccessUrl,
			tosUrl,
			privacyPolicyUrl
		};

		if (uiConfig.signInOptions !== undefined) {
			if (signInWith.google) uiConfig.signInOptions.push(GoogleAuthProvider.PROVIDER_ID);
			if (signInWith.facebook) uiConfig.signInOptions.push(FacebookAuthProvider.PROVIDER_ID);
			if (signInWith.twitter) uiConfig.signInOptions.push(TwitterAuthProvider.PROVIDER_ID);
			if (signInWith.github) uiConfig.signInOptions.push(GithubAuthProvider.PROVIDER_ID);
			if (signInWith.emailPassword) uiConfig.signInOptions.push(EmailAuthProvider.PROVIDER_ID);
			if (signInWith.emailPasswordless)
				uiConfig.signInOptions.push({
					provider: EmailAuthProvider.PROVIDER_ID,
					signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
					forceSameDevice,
					emailLinkSignIn:
						continueUrl === undefined
							? undefined
							: ((continueUrl: string) => () => {
									return {
										url: continueUrl
									};
							  })(continueUrl)
				});
			if (signInWith.phone) uiConfig.signInOptions.push(PhoneAuthProvider.PROVIDER_ID);
			if (signInWith.anonymous)
				uiConfig.signInOptions.push(firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID);
		}

		initAuthUi();
	}
	function initAuthUi() {
		if (ui) {
			ui.reset();
			ui.start(container, uiConfig);
		} else {
			ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
			ui.start(container, uiConfig);
		}
	}

	async function handleUIError(error: firebaseui.auth.AuthUIError): Promise<void> {
		console.error(error);
		window.location.replace('/');
	}
</script>

<svelte:head>
	<link href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" rel="stylesheet" />
</svelte:head>

{#if !uiShown}
	<slot>
		<div>Loading...</div>
	</slot>
{/if}
<div bind:this={container} />
