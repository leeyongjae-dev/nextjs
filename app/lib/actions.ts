'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

/* invoice 등록 */
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch(error) {
    return {
      message : 'Database Error: Failed to Create Invoice.'
    }
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

/* invoice 수정 */
export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
    try {
      await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch(error) {
      return {
        message : 'Database Error: Failed to Update Invoice.'
      }
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

/* invoice 삭제 */
export async function deleteInvoice(id: string) {

  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch(error) {
    return {
      message : 'Database Error: Failed to Delete Invoice.'
    } 
  } 
  revalidatePath('/dashboard/invoices');
}

const FormCusSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  imageurl: z.string(),
});
 
const CreateCustomer = FormCusSchema.omit({ id: true });
const UpdateCustomer = FormCusSchema.omit({ id: true });

/* customer 등록 */
export async function createCustomer(formData: FormData) {

  const { name, email, imageurl } = CreateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    imageurl: formData.get('imageurl'),
  });

  try {
    await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${imageurl})
    `;
  } catch(error) {
    return {
      message : 'Database Error: Failed to Create Customer.'
    }
}
revalidatePath('/dashboard/customers');
redirect('/dashboard/customers');
}

/* customer 수정 */
export async function updateCustomer(id: string, formData: FormData) {
  const { name, email, imageurl } = UpdateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    imageurl: formData.get('imageurl'),
  });

  try {
    await sql`
      UPDATE customers
      SET  name = ${name}, email = ${email}, image_url = ${imageurl}
      WHERE id = ${id}
    `;
  } catch(error) {
    return {
      message : 'Database Error: Failed to Update Customer.'
    }
  }
  revalidatePath('/dashboard/customers');
  redirect(`/dashboard/customers`);
}

/* customer 삭제 */
export async function deleteCustomer(id: string) {

try {
  await sql`DELETE FROM customesrs WHERE id = ${id}`;
} catch(error) {
  return {
    message : 'Database Error: Failed to Delete Customer.'
  } 
} 
revalidatePath('/dashboard/customesrs');
}