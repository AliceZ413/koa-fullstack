import {db} from '@/server/db'

export async function GET() {
    const dashboardUsers = await db.dashboardUser.findMany();
    return Response.json({
        dashboardUsers,
    });
}
