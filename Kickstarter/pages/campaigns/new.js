import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

export default class CampaignNew extends Component {
	state = {
		minimumContribution: "",
		errorMessage: "",
		loading: false
	};

	onSubmit = async e => {
		e.preventDefault();
		this.setState({ loading: true, errorMessage: "" });

		try {
			const accounts = await web3.eth.getAccounts();
			await factory.methods
				.createCampaign(this.state.minimumContribution)
				.send({
					from: accounts[0]
				});
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	};

	render() {
		return (
			<Layout>
				<h3>Create a Campaign</h3>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Minimum Contribution (wei)</label>
						<Input
							label="wei"
							labelPosition="right"
							value={this.state.minimumContribution}
							onChange={e =>
								this.setState({ minimumContribution: e.target.value })
							}
						/>
					</Form.Field>
					<Message error header="Oops!" content={this.state.errorMessage} />
					<Button primary loading={this.state.loading}>
						Create!
					</Button>
				</Form>
			</Layout>
		);
	}
}