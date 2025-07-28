import { NextRequest, NextResponse } from "next/server";
import { getTicketsData } from "../data";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  ctx: unknown // <– workaround to avoid the RouteContext typing bug
) {
  const { params } = ctx as { params: { id: string } }; // safely cast context

  const ticketsData = await getTicketsData();
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "No ID is provided" }, { status: 400 });
  }

  const ticket = ticketsData.find((t) => t.id === id);

  if (!ticket) {
    return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json({ ticket });
}

// export async function PUT(request: Request, { params }: RouteParams) {
//   const ticketsData = await getTicketsData();
//   const body = await request.json();
//   const index = ticketsData.findIndex((t) => t.id === params.id);

//   if (index === -1) {
//     return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
//   }

//   const updatedTicket: Ticket = {
//     ...ticketsData[index],
//     ...body,
//     date: {
//       ...ticketsData[index].date,
//       updated_at: {
//         time: new Date().toLocaleTimeString("fa-IR", {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         jalali: new Date().toLocaleDateString("fa-IR"),
//         milady: new Date().toISOString(),
//       },
//     },
//   };

//   await setTicketsData([
//     ...ticketsData.slice(0, index),
//     updatedTicket,
//     ...ticketsData.slice(index + 1),
//   ]);

//   return NextResponse.json({ ticket: updatedTicket });
// }

// export async function DELETE(request: Request, { params }: RouteParams) {
//   const ticketsData = await getTicketsData();
//   const newData = ticketsData.filter((t) => t.id !== params.id);
//   await setTicketsData(newData);
//   return NextResponse.json({ success: true });
// }
