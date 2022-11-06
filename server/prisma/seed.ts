import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			name: "John Doe",
			email: "johndoe@email.com",
			avatarUrl: "https://www.w3schools.com/howto/img_avatar.png"
		}
	})

	const pool = await prisma.pool.create({
		data: {
			title: "Exemplo de Bolão",
			code: "BOL123",
			ownerId: user.id,

			participants: {
				create: {
					userId: user.id
				}
			}
		}
	})

	await prisma.game.create({
		data: {
			date: '2022-11-05T13:30:00.201Z',
			firstTeamCountryCode: "DE",
			secondTeamCountryCode: "BR",
		}
	})

	await prisma.game.create({
		data: {
			date: '2022-11-06T13:30:00.201Z',
			firstTeamCountryCode: "AR",
			secondTeamCountryCode: "BR",

			guesses: {
				create: {
					firstTeamPoints: 0,
					secondTeamPoints: 3,
					participant: {
						connect: {
							userId_poolId: {
								poolId: pool.id,
								userId: user.id
							}
						}
					}
				}
			}
		}
	})
}

main();