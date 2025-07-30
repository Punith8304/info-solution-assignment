import AgentModel from "../schemas/agentSchema.js"



//function for finding and returning all agents
export const getAgentsService = async () => {
    try {
        const agents = await AgentModel.find();
        return { agents: agents, fetched: true }
    } catch (error) {
        return { fetched: false }
        console.log(error)
    }
}