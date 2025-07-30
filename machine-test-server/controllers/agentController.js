
import xlsx from "read-excel-file/node"
import { csvFileRead } from "../services/csvFileService.js";
import { excelFileRead } from "../services/xlsxFileService.js";
import AgentModel from "../schemas/agentSchema.js";
import { createHash } from "../services/BcryptServices.js";
import { getAgentsService } from "../services/agentServices.js";
import { taskDistributionService } from "../services/taskDistributionServices.js"




//taking the file and converting to buffer and using it to read and update tasks for agents
export const agentTaskUpload = async (req, res, next) => {
    const filePathName = req.file.path;
    const type = req.body.type;



    try {

        //for csv files
        if (type === "csv") {
            const result = await csvFileRead(filePathName)
            const taskDistributionResult = await taskDistributionService(result.results)
            const getAgentsDetails = await getAgentsService()
            getAgentsDetails.agents.sort((a, b) => a.tasks.length - b.tasks.length)
            res.send({ status: 200, fileUpload: taskDistributionResult.result, result: result.fileUpload, agentsFetched: getAgentsDetails.agents })
        } else {

            //for xlsx or xls files
            const result = await excelFileRead(filePathName)
            const taskDistributionResult = await taskDistributionService(result.result)
            const getAgentsDetails = await getAgentsService()
            getAgentsDetails.agents.sort((a, b) => a.tasks.length - b.tasks.length)
            res.send({ status: 200, fileUpload: taskDistributionResult.result, result: result.fileUpload, agentsFetched: getAgentsDetails.agents })
        }
    } catch (error) {
        console.log(error)
        res.send({ fileUpload: false })
    }

}







//function for creating agent
export const createAgent = async (req, res) => {
    const agent = req.body.agent
    const hashPassword = createHash(agent.password)
    const agentCheck = await AgentModel.find({ email: agent.email });
    try {
        if (agentCheck.length === 0) {
            const newAgent = AgentModel({
                name: agent.name,
                email: agent.email,
                mobile: agent.countryCode + agent.mobile,
                password: hashPassword.hash,
                tasks: []
            })
            try {
                await newAgent.save()
                const agents = await getAgentsService()
                res.send({ agentsFetched: agents.agents, agentCreated: true, fetched: agents.fetched })
            } catch (error) {
                console.log(error)
                res.send({ agentCreated: false })
            }
        } else {
            res.send({ agentCreated: false, agentExist: true })
        }
    } catch (error) {
        console.log(error)
        res.send({ agentCreated: false })
    }
}




//function for gettig all agents from DB
export const getAgents = async (req, res) => {
    try {
        const agentsFetched = await getAgentsService()
        if (agentsFetched) {
            res.send({ fetched: agentsFetched.fetched, agentsFetched: agentsFetched.agents })
        } else {
            res.send({ fetched: false })
        }
    } catch (error) {
        console.log(error)
        res.send({ fetched: false })
    }
}