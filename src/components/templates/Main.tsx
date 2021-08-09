import { ReactNode } from "react";
import AzureAuthenticationButton from "../../functions/azureSSO/azure-authentication-component";
import Link from "next/link";
import React, { useState } from "react";
import { AppConfig } from "../../utils/AppConfig";
import { useRouter } from "next/router";
import { AccountInfo } from "@azure/msal-browser";

type IMainProps = {
	meta: ReactNode;
	children: ReactNode;
};

const Main = (props: IMainProps) => {
	// current authenticated user
	const [currentUser, setCurrentUser] = useState<AccountInfo>();

	// authentication callback
	const onAuthenticated = async (userAccountInfo: AccountInfo) => {
		setCurrentUser(userAccountInfo);
	};

	// Render JSON data in readable format
	const PrettyPrintJson = ({ data }: any) => {
		return (
			<div>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		);
	};

	// Quick link - user revokes app's permission
	const ShowPermissionRevokeLinks = () => {
		return (
			<div>
				<div>
					<a href="https://myapps.microsoft.com" target="_blank" rel="noopener noreferrer">
						Revoke AAD permission
					</a>
				</div>
				<div>
					<a href="https://account.live.com/consent/manage" target="_blank" rel="noopener noreferrer">
						Revoke Consumer permission
					</a>
				</div>
			</div>
		);
	};
	return (
		<div className="antialiased w-full text-gray-700">
			{props.meta}

			<div className="max-w-screen-md mx-auto">
				<div className="border-b border-gray-300">
					<div className="pt-16 pb-8">
						<div className="font-bold text-3xl text-gray-900">
							{AppConfig.title}
							<AzureAuthenticationButton onAuthenticated={onAuthenticated} className="float-right" />
						</div>
						<div className="text-xl">{AppConfig.description}</div>
						{currentUser && (
							<div>
								<PrettyPrintJson data={currentUser} />
								<ShowPermissionRevokeLinks />
							</div>
						)}
					</div>
					<div>
						<ul className="flex flex-wrap text-xl">
							<li className="mr-6">
								<Link href="/">
									<a className="text-gray-700 border-none hover:text-gray-900">Home</a>
								</Link>
							</li>
							<li className="mr-6">
								<Link href="/about/">
									<a className="text-gray-700 border-none hover:text-gray-900">About</a>
								</Link>
							</li>
							<li className="mr-6">
								<a
									className="text-gray-700 border-none hover:text-gray-900"
									href="https://github.com/ixartz/Next-js-Boilerplate"
								>
									GitHub
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="py-5 text-xl content">{props.children}</div>

				<div className="border-t border-gray-300 text-center py-8 text-sm">
					© Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{" "}
					<span role="img" aria-label="Love">
						♥
					</span>{" "}
					by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
					{/*
					 * PLEASE READ THIS SECTION
					 * We'll really appreciate if you could have a link to our website
					 * The link doesn't need to appear on every pages, one link on one page is enough.
					 * Thank you for your support it'll mean a lot for us.
					 */}
				</div>
			</div>
		</div>
	);
};

export { Main };
