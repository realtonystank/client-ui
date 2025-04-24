import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress } from "@/lib/http/api";

const formSchema = z.object({
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters long." }),
});

const AddAddress = ({ customerId }: { customerId: string | undefined }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["address", customerId],
    mutationFn: async (data: { address: string }) => {
      return await addAddress(customerId!, data?.address);
    },
    onSuccess: () => {
      addressForm.reset();
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });
  const addressForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  const handleAddAddress = (data: z.infer<typeof formSchema>) => {
    mutate(data);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"link"}>
          <Plus size={"16"} />
          <span className="ml-2">Add New Address</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...addressForm}>
          <form onSubmit={addressForm.handleSubmit(handleAddAddress)}>
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>
                We can sve your address for next time order.
              </DialogDescription>
            </DialogHeader>
            {isError && (
              <div className="mt-1 text-sm text-red-600">{error.message}</div>
            )}
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <FormField
                  name="address"
                  control={addressForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Textarea className="mt-2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-centerr gap-2">
                    <LoaderCircle className="animate-spin" />
                    <span>Please wait...</span>
                  </span>
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddress;
