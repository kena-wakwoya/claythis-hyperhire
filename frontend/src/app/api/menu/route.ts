// app/api/menu/route.ts
import { MenuItem } from '@/app/types';
import { NextResponse } from 'next/server';

let menus: MenuItem[] = [];

export async function GET() {
  return NextResponse.json(menus);
}

export async function POST(request: Request) {
  const newMenu: MenuItem = await request.json();
  menus.push(newMenu);
  return NextResponse.json(newMenu);
}

export async function PUT(request: Request) {
  const updatedMenu: MenuItem = await request.json();
  const index = menus.findIndex(menu => menu.id === updatedMenu.id);
  if (index !== -1) {
    menus[index] = updatedMenu;
  }
  return NextResponse.json(updatedMenu);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  menus = menus.filter(menu => menu.id !== id);
  return NextResponse.json({ id });
}