import ServiceTemplate from "@/components/templates/ServiceTemplate"
import { getServiceData } from "@/data/services/servicesData"

export default function AIServicePage() {
    const data = getServiceData('data')
    if (!data) return <div>Service not found</div>

    return <ServiceTemplate data={data} />
}