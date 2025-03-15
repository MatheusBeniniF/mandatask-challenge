/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
INSERT INTO public."User" (email,name,"password") VALUES
	 ('usuario1@email.com','Usuário 1','User@1'),
	 ('usuario2@email.com','Usuário 2','User@2');

INSERT INTO public."Task" (name,solved,scheduled_for,"createdAt","updatedAt","deletedAt","createdBy") VALUES
('Task 1 - Usuário 1',false,'2025-02-25 21:53:03.302','2025-02-17 21:53:32.886','2025-02-17 21:53:03.302',NULL,1);

INSERT INTO public."Task" (name,solved,scheduled_for,"createdAt","updatedAt","deletedAt","createdBy") VALUES
('Task 2 - Usuário 1',false,'2025-02-25 21:53:03.302','2025-02-17 21:53:32.886','2025-02-17 21:53:03.302',NULL,1);

INSERT INTO public."Task" (name,solved,scheduled_for,"createdAt","updatedAt","deletedAt","createdBy") VALUES
('Task 1 - Usuário 2',false,'2025-02-25 21:53:03.302','2025-02-17 21:53:32.886','2025-02-17 21:53:03.302',NULL,2);

