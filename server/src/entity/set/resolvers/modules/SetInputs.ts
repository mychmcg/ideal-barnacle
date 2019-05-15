import { Field, ID, InputType, Int } from "type-graphql";
import { Set } from "../../SetEntity";

@InputType({ description: "Create new set data" })
export class CreateSetInput implements Partial<Set> {
  @Field() exerciseName: string;
  @Field() warmUp: boolean;
  @Field() weight: number;
  @Field() systemOfMeasurement: string;
  @Field(() => Int) reps: number;
  @Field() rpe: number;
  @Field(() => ID) userId: string;
}

@InputType({ description: "Update set data" })
export class UpdateSetInput implements Partial<Set> {
  @Field() id: string;
  @Field({ nullable: true }) warmUp?: boolean;
  @Field({ nullable: true }) weight?: number;
  @Field({ nullable: true }) systemOfMeasurement?: string;
  @Field(() => Int, { nullable: true }) reps?: number;
  @Field({ nullable: true }) rpe?: number;
  @Field(() => Int, { nullable: true }) order?: number;
}