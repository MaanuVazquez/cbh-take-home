# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

[1] (BE) Add facilityAgentId field to Facility_Agents relationship table

We need to add the `facilityAgentId` field so each facility can assign their own id to the Agents instead of just using the internal ids.

With the creation of `facilityAgentId` field we need to create a migration that sets an agent id per facility by default using the nomenclature.

Impotant! The field should be unique and the default value should be the name of the facility as prefix and an autoenum E.g. `KLOP-1`, `KLOP-2`.

[2] (BE) Create facilityAgentId endpoints under facilities model

We need the endpoints for read and update the `facilityAgentId` of an specific Facility for FE to consume.

[3] (FE) Admin add the possibility of customizing an agent id by facility

We need to add the possibility of search an agent and set a custom id per facility.

AC
- Facility should have a new AgentId section
- It should show a dropdown with all the agents (mocked for now) to select (you can only select one at a time)
- When an agent of the facility is selected an input with the current facilityAgentId and a button to submit.

[4] (FE) Connect Admin with the updated Facility API

We need to connect the new AgentsId section of the Facility module with the updated API.

AC
- The page should fetch all the users of the facility (e.g. on users module)
- When selecting an user the correct `facilityAgentId` should show in the id input.
- When the admin changes the id and submits, before we send the data to BE we should check that the value is valid (it is not an empty string and it is not the same as the current id)
- When the form is correctly submitted the FacilityAgentId should change.

[5] (FE) Update `getShiftsByFacility` function to use `facilityAgentId` insted of `agentId`

Currently the `getShiftsByFacility` function returns every shift and the agent related to that shift using the agent internal id. We need to update this function to instead use the new `facilityAgentId` field coming from the Facility API.