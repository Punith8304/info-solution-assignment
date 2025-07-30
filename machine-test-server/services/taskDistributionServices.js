import AgentModel from "../schemas/agentSchema.js"


//task distribution function which distributes the tasks among the agents equally
export const taskDistributionService = async (tasks) => {
    try {
        console.log(tasks)
        //getting all agents
        const allAgents = await AgentModel.find()

        //sorting agents according to their tasks array length
        allAgents.sort((a, b) => a.tasks.length - b.tasks.length)

        //for loop to iterate through tasks which we extracted from files
        for (let task of tasks) {

            //taking the tasks of the agent who has least no.of tasks
            const agentTasks = allAgents[0].tasks

            //updating the agent by adding one more task to that agent
            const updateAgent = await AgentModel.updateOne({ email: allAgents[0].email }, { tasks: [...agentTasks, task] })
            allAgents[0].tasks = [...agentTasks, task]

            //again sorting the agents to see who has the least no.of tasks
            allAgents.sort((a, b) => a.tasks.length - b.tasks.length)
        }
        return {result: true}
    } catch (error) {
        console.log(error)
        return {result: false}
    }
}